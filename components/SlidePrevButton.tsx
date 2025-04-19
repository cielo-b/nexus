import { FC } from "react";
import { useSwiper } from "swiper/react";


type PrevButtonProps = {
  swipingButtonRefPrev: React.RefObject<HTMLButtonElement>; 
};


const SlidePrevButton: FC<PrevButtonProps> = (props) => {
  const swiper = useSwiper(); 

  return (
    <button
      onClick={() => swiper.slidePrev()}
      ref={props.swipingButtonRefPrev}></button>
  );
};

export default SlidePrevButton;
