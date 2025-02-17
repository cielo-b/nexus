import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { send_mail } from "../services/send-mail";
import { CustomError } from "@/utils/response";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
import Header from "./Header";
import CustomButton from "./CustomButton";
import Popup from "./Popup";
import { Fade } from "react-awesome-reveal";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClosePopup = () => {
    setLoading(false);
    setSuccess(false);
    setError(null);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (loading) return;

      setLoading(true);
      setSuccess(false);
      setError(null);

      const response = await send_mail(data);

      if (response.success) {
        setSuccess(true);
        reset(); // Reset the form fields
      } else {
        setError(response.message);
      }
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.response.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contactus"
      className="flex flex-col  gap-5 justify-center items-center lg:items-start    relative "
    >
      <img
        src="/images/zigs.svg"
        alt="zigs"
        className="absolute w-2/5 top-[330px] -right-1/4 z- 30"
      />
      <div className="flex flex-col items-center lg:items-start justify-center gap-4 ">
        <h1 className="text-black font-bold text-3xl max-md:text-4xl max-sm:text-2xl ">
          Any<span className="text-[#2563eb]"> Insights </span>?
          Feel Free To <span className="text-[#2563eb]">Contact</span> Us
        </h1>
      </div>
      <form
        className="w-full flex flex-col items-center gap-4 justify-center  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between w-full max-sm:flex-col gap-6">
          <div className="flex flex-col w-[48%] items-start justify-between max-sm:w-full">
            <label className="font-normal text-[#2563eb] text-lg max-md:text-md max-sm:text-sm">
              Name
            </label>
            <div className="flex items-center justify-start gap-3 relative rounded-full w-full px-6 bg-[#2563eb]/5 hover:shadow-sm hover:shadow-[#2563eb] transition-all duration-300 focus:border focus:border-[#2563eb]">
              <img
                src={"/images/user.svg"}
                alt="icon"
                className="w-[28px] max-md:w-[24px] max-sm:w-[20px]"
              />
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name should be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter your name"
                    className={`w-full h-12 font-normal text-md items-start justify-start flex focus:outline-0 placeholder-black/50 text-black bg-transparent rounded-full hover:cursor-pointer autofill:bg-transparent autofill:fill-none autofill:shadow-[inset_0_0_0px_1000px_rgb(0,27,14)] autofill:text-black`}
                  />
                )}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col w-[48%] items-start justify-between max-sm:w-full">
            <label className="font-normal text-[#2563eb] text-lg max-md:text-md max-sm:text-sm">
              Email
            </label>
            <div className="flex items-center justify-start gap-3 relative rounded-full w-full px-6 bg-[#2563eb]/5 hover:shadow-sm hover:shadow-[#2563eb] transition-all duration-300 focus:border focus:border-[#2563eb]">
              <img
                src={"/images/mail.svg"}
                alt="icon"
                className="w-[28px] max-md:w-[24px] max-sm:w-[20px]"
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Entered value does not match email format",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter your email"
                    className={`w-full h-12 font-normal text-md items-start justify-start flex focus:outline-0 placeholder-black/50 text-black bg-transparent rounded-full hover:cursor-pointer autofill:bg-transparent autofill:fill-none autofill:bg-black`}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-2 flex-start items-start">
          <p className="font-normal text-[#2563eb] text-lg max-md:text-md max-sm:text-sm">
            Message
          </p>
          <div className="flex items-start justify-start gap-3 relative rounded-3xl w-full px-6 py-6 bg-[#2563eb]/5 hover:shadow-sm hover:shadow-[#2563eb] transition-all duration-300 focus:border focus:border-[#2563eb]">
            <img
              src={"/images/message.svg"}
              alt="icon"
              className="w-[28px] max-md:w-[24px] max-sm:w-[20px]"
            />
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Enter your message"
                  className="w-full placeholder-black/50 h-[80px] font-normal bg-transparent text-md items-start justify-start flex text-black focus:outline-0 hover:cursor-pointer autofill:bg-transparent autofill:fill-none autofill:bg-black"
                />
              )}
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        <CustomButton
          title={loading ? "Sending..." : "Send"}
          btnType="submit"
          isDisabled={loading || !isValid}
          containerStyles="w-full"
          isLoading={loading}
        />
        {success && (
          <Popup
            handleClose={handleClosePopup}
            title="Thank you for getting in touch with us"
            message={`Check your email for a response`}
            image="/images/emailsent.svg"
          />
        )}
        {error && (
          <Popup
            handleClose={handleClosePopup}
            title="Sorry! We couldn't send your email"
            message={`${error}. Try again`}
            image="/images/emailnotsent.svg"
          />
        )}
      </form>
    </div>
  );
};

export default ContactUs;
