import { FC, SVGProps } from "react";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

import NodeIcon from "@/assets/logo-node 1.svg?react";
import ReactIcon from "@/assets/react.svg?react";
import AngularIcon from "@/assets/angular.svg?react";
import JavascriptIcon from "@/assets/javascript.svg?react";
import JavaIcon from "@/assets/logo-java 1.svg?react";
import PhpIcon from "@/assets/logo-php 1.svg?react";
import DataScienceIcon from "@/assets/data-science.svg?react";
import BbddIcon from "@/assets/logo-bbdd 1.svg?react";

export const asideContent: { icon: SvgIcon; label: string }[] = [
  { icon: NodeIcon, label: "Node" },
  { icon: ReactIcon, label: "React" },
  { icon: AngularIcon, label: "Angular" },
  { icon: JavascriptIcon, label: "JavaScript" },
  { icon: JavaIcon, label: "Java" },
  { icon: PhpIcon, label: "FullStack PHP" },
  { icon: DataScienceIcon, label: "Data Science" },
  { icon: BbddIcon, label: "BBDD" },
];
