import React, { useState } from "react";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import GroupedLinks from "./GroupedLinks";
import { FooterLinks } from "@/constants";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Popup = ({
  handleClose,
  title,
  message,
  image,
}: {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  message: string;
  image: string;
}) => (
  <div className="fixed top-0 left-0 w-full h-full bg-[#000000a4] backdrop-blur-lg flex justify-center items-center max-sm:px-6 z-50">
    <div className="bg-white p-6 rounded-[30px] text-center relative flex flex-col items-center justify-center gap-5">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={handleClose}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="w-[160px] h-[160px] bg-white flex items-center justify-center rounded-full absolute -top-[25%] z-30">
        <img src={image} alt={title} className="w-[60px] absolute top-10" />
      </div>
      <h2 className="text-[#000912] font-semibold text-xl max-sm:text-lg z-50 mb-2 w-full">
        {title}
      </h2>
      <p className="text-[#000912] z-50">{message}</p>
      <CustomButton
        title="Got it!"
        handleClick={handleClose}
        containerStyles="flex items-center justify-center w-full"
        textStyles="text-white"
      />
    </div>
  </div>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleClosePopup = () => {
    setSubscribed(false);
    setAlreadySubscribed(false);
    setErrorMessage("");
    setEmail("");
  };

  const handleSubscribe = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.nexus.rw/api/v1/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.ok) {
        setSubscribed(true);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        if (errorData.payload.subscription) {
          setAlreadySubscribed(true);
        } else {
          setErrorMessage(errorData.message || "Subscription failed.");
        }
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setErrorMessage("An error occurred while subscribing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f2f4fa] px-[100px] max-lg:px-6 py-[50px] max-lg:py-[25px]  flex flex-col w-full gap-[34px] max-md:gap-[27px] max-sm:gap-[16px]">
      <hr className="border-1 border-[#C6C6C6] w-full " />
      <div className="w-full flex items-center justify-between max-md:flex-col">
        <img
          src="/images/logo.png "
          alt="logo"
          className="max-md:w-[35%] lg:w-[12%]"
        />
        <div className="flex flex-col w-3/6 gap-[27px] max-md:w-full border-l-2 pl-10 ">
          <div className="flex flex-col gap-[10px] max-md:pt-5">
            <p className="text-[#000912] font-semibold text-2xl ">Subscribe</p>
            <p className="text-[#000912]/50 font-normal text-lg max-md:text-sm">
              Get Product updates and our changelog. No spam ever
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-[32px] max-md:gap[5%] max-sm:justify-between max-md:flex-col items-center" 
          >
            <InputField
              icon="/images/mail.svg"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              style="dark"
              name={""}
              ref={undefined}
              onBlur={function (): void {
                throw new Error("Function not implemented.");
              }}
              error={undefined}
            />
            <CustomButton
              title={loading ? "Subscribing..." : "Subscribe"}
              containerStyles="max-h-fit"
              rightIcon={
                <PaperAirplaneIcon
                  className={`group-hover:stroke-[#2563eb] w-6 h-6 stroke-white max-md:hidden ${
                    loading ? "dance" : ""
                  }`}
                />
              }
              isDisabled={loading || !email}
              isLoading={loading}
            />
          </form>

          {subscribed && (
            <Popup
              handleClose={handleClosePopup}
              title="Thank you for subscribing to Nexus!"
              message={`The confirmation email was sent to ${email}`}
              image="/images/emailsent.svg"
            />
          )}

          {alreadySubscribed && (
            <Popup
              handleClose={handleClosePopup}
              title="You are already subscribed!"
              message={`The email ${email} is already subscribed.`}
              image="/images/emailnotsent.svg"
            />
          )}

          {errorMessage && (
            <Popup
              handleClose={handleClosePopup}
              title={
                errorMessage === "Unprocessable Entity Error"
                  ? `This Email contains typos or is wrong`
                  : `This email is already subscribed`
              }
              message={
                errorMessage === "Unprocessable Entity Error"
                  ? `Check whether this email is well spelled`
                  : `This email is already subscribed to Nexus`
              }
              image="/images/emailnotsent.svg"
            />
          )}
        </div>
      </div>

      <hr className="border-1 border-[#C6C6C6] w-full " />
      <GroupedLinks links={FooterLinks} />
      <hr className="border-1 border-[#C6C6C6] w-full " />

      <div className="w-full flex items-center justify-center ">
        <p className="text-[#000912]/50 font-medium text-center max-sm:text-sm">
          Copyright © 2024{" "}
          <a href="mailto:team.nexus@gmail.com" className="text-[#000912]">
            info@insightnexus.africa
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
