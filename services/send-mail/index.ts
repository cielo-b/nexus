import { AxiosErrorHandler, CustomError, ResponseType } from "@/utils/response";
import { PUBLIC_API } from "../axios";

export type SendMailType = {
  name: string;
  email: string;
  message: string;
};

export const send_mail = async (
  dto: SendMailType
): Promise<ResponseType<null>> => {
  try {
    const request = await PUBLIC_API.post("/landing-mail", dto);
    return request.data; // This returns the response from the server
  } catch (error: any) {
    throw new CustomError(AxiosErrorHandler(error));
  }
};
