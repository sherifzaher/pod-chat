import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Attachment } from '../utils/types';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Attachment,
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadImages(
    files: Attachment[],
  ): Promise<(UploadApiResponse | UploadApiErrorResponse | undefined)[]> {
    return Promise.all(
      files.map(async (file) => {
        return this.uploadImage(file);
      }),
    );
  }
}
