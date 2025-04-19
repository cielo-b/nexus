import {EResponse} from "@/enums/response.enum";
import {ResponseType} from "@/utils/response";

export class ResponseService {
  public makeResponse<T>(
    message: string,
    statusCode: number,
    data: T | null,
    responseType: EResponse
  ): ResponseType<T> {
    const response = {
      success: responseType == EResponse.SUCCESS ? true : false,
      statusCode: statusCode,
      message: message,
      data,
    };

    return response;
  }
}