import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_KEY_ID, R2_BUCKET_NAME } =
  process.env;

if (
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_KEY_ID ||
  !R2_BUCKET_NAME
) {
  throw new Error("Missing required environment variables");
}

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_KEY_ID,
  },
});

export default async function handler(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { filename, fileHash, contentType } = await req.json();
  const signedUrl = await getSignedUrl(
    R2,
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: `resources/${fileHash}/${filename}`,
      ContentType: contentType as string,
    }),
    { expiresIn: 3600 },
  );

  return NextResponse.json({ url: signedUrl, method: "PUT" });
}

export { handler as GET, handler as POST, handler as PUT };
