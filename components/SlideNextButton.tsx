import { FC } from "react";
import { useSwiper } from "swiper/react";

type NextButtonProps = {
  swipingButtonRefNext: React.RefObject<HTMLButtonElement>;
};


const SlideNextButton: FC<NextButtonProps> = (props) => {
  const swiper = useSwiper(); 

  return (
    <button
      className="hidden"
      onClick={() => swiper.slideNext()}
      ref={props.swipingButtonRefNext}></button>
  );
};

export default SlideNextButton;
