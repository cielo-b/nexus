import type { NextApiRequest, NextApiResponse } from "next";

import { EResponse } from "@/enums/response.enum";
import { MailService } from "@/helpers/mail.service";
import { ResponseService } from "@/helpers/response.service";
import { requestDemoAdminMail } from "@/templates/request-demo/admin.template";
import { requestDemoClientMail } from "@/templates/request-demo/client.template";
import { ResponseType } from "@/utils/response";
import { HttpStatusCode } from "axios";


export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<null>>
) {
  const mailService = new MailService();
  const responseService = new ResponseService();
  try {
    const dto = req.body;

    await mailService.sendEmail({
      email: "mugishayves189000@gmail.com",
      subject: "New Submission from Landing Page - Nexus",
      body: requestDemoAdminMail(dto),
    });

    await mailService.sendEmail({
      email: dto.email,
      body: requestDemoClientMail({ firstName: dto.name.split(" ")[0] }),
      subject: "Acknowledgment of Your Inquiry - Nexus",
    });

    const response = responseService.makeResponse(
      "EMAIL SENT SUCCESSFULLY",
      HttpStatusCode.Ok,
      null,
      EResponse.SUCCESS
    );
    res.status(response.statusCode).json(response);
    return;
  } catch (error: any) {
    console.log("ERROR: ", error);
    const response = responseService.makeResponse(
      "ERROR: " + error.message,
      HttpStatusCode.InternalServerError,
      null,
      EResponse.ERROR
    );
    res.status(response.statusCode).json(response);
    return;
  }
}
