import React, { useEffect, useState } from "react";

type TypographyProps = {
  children: string
  size?: 'xs' | 'sm' | 'base' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  element?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  size = "base",
  weight = "normal",
  element: TypographyComponent = "span",
  className = "",
  style
}) => {
  const [fontSize, setFontSize] = useState('')
  const [fontWeight, setFontWeight] = useState('')

  useEffect(() => {
    switch(size){
      case 'xs' :
        setFontSize('text-xs')
        break
      case 'sm' :
        setFontSize('text-sm')
        break
      case 'base' :
        setFontSize('text-base')
        break
      case '2xl' :
        setFontSize('text-2xl')
        break
      case '3xl' :
        setFontSize('text-3xl')
        break
      case '4xl' :
        setFontSize('text-4xl')
        break
      case '5xl' :
        setFontSize('text-5xl')
        break
    }
  },[size])
  
  useEffect(() => {
    switch(weight){
      case 'light' :
        setFontWeight('font-light')
        break
      case 'normal' :
        setFontWeight('font-normal')
        break
      case 'medium' :
        setFontWeight('font-medium')
        break
      case 'semibold' :
        setFontWeight('font-semibold')
        break
      case 'bold' :
        setFontWeight('font-bold')
        break
    }
  },[weight])

  return (
    <TypographyComponent
      className={`${fontSize} ${fontWeight} ${className}`}
      style={style}
    >
      {children}
    </TypographyComponent>
  );
}