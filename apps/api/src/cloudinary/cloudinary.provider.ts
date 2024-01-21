import { v2, ConfigOptions } from 'cloudinary';
import { Services } from '../utils/constants';

export const CloudinaryProvider = {
  provide: Services.CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'duwjkfuai',
      api_key: '221391294414565',
      api_secret: 'O9f8NRgdedLnZqz2_NCfZqcw1WM',
    });
  },
};
