import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group "
      toastOptions={{

        // style: {
        //   background: `var(--backeground-darker)`,
        //   color: `var(--foreground)`,
      
        // },
        
        classNames: {
          toast: `group toast rounded-lg  min-h-fit
            group-[.toaster]:border-border group-[.toaster]:shadow-lg`,
          
          title: " text-2xl font-bold ",
          description: " text-sm ",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-content",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
