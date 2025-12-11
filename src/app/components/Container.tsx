interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full md:w-[55%] mx-auto px-6 md:px-0 ${className}`}>
      {children}
    </div>
  );
}
