import { MouseEventHandler, ReactNode } from "react";
import { IconType } from "react-icons";
import { Control } from 'react-hook-form';
import { Content } from "@/components/RichContent";

export interface MenuItemProps {
  to: string;
  label: string;
  isActive: boolean;

}
export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean; // Add isLoading prop
}


export interface TagButtonProps {
  tagLogo: string;
  tagText: string;
}
export interface AnalyticsProps {
  title: Number;
  description: string;
}
export interface HeaderProps {
  title: string;
  icon: React.ReactNode;
}

export interface FeaturesProps {
  icon?: string;
  title: string;
  description: Content[];
  image?: string;
  isActive?: boolean;
  onClick?: () => void; // Add onClick property
}

export interface TestimonyProps {
  //   const {name, ratings, description, postDate, profilePic} = props;
  name: string;
  title: Content[];
  ratings: number;
  description: string;
  profilePic: string;
}


export interface InputFieldProps {
  placeholder: string;
  icon?: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style: "light" | "dark";
  control?: Control<any>;
  name: string;
}

export interface GroupedLinksProps {
  title: string;

}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonProps = {
  imgSrc: string;
  text: string;
};

type ChartProps = {
  icon: ReactNode;
};

type NextButtonProps = {
  swipingButtonRefNext: any;
};

type PrevButtonProps = {
  swipingButtonRefPrev: any;
};

type Testimony = {
  name: string;
  ratings: number;
  description: string;
  postDate: string;
  profilePic: string;
};

type Question = {
  question: string;
  answer: string;
  expanded: boolean;
  panel: string;
  handleChange: (question: string) => any;
  page?: string;
};

type Step = {
  icon: ReactNode;
  title: string;
  description: string;
};

type Feature = Pick<Step, "icon" | "title" | "description">;

type Option = {
  flag: string;
  name: string;
  idd: string[];
};

export interface FormFieldProps {
  label?: string;
  control: any;
  name: string;
  placeholder: string;
  inputStyles?: string;
  icon?: string;
  type?: string;
  options?: Option[];
};