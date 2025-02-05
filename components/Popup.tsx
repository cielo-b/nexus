import { XMarkIcon } from "@heroicons/react/24/outline";
import CustomButton from "./CustomButton";

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
  }) => {

    
    return(
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000a4] backdrop-blur-lg flex justify-center items-center max-sm:px-6 z-50">
      <div className="bg-white p-12 rounded-[30px] text-center relative flex flex-col items-center justify-center gap-5">
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
  )};

  export default Popup;