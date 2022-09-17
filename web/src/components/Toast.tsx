import * as Toast from "@radix-ui/react-toast";

interface Props {
    open?: boolean;
    content: {
        type: string;
        text: string
    };
}
export function ToastContent({ open = false, content }: Props) {
return (
    <>
    <Toast.Root duration={3000} open={open} className={`max-w-xs flex justify-center align-center fixed bottom-3 right-3 bg-zinc-900 rounded border ${content.type === 'success' ? 'border-violet-600'  :  'border-red-500'} animate-pulse`} >
        <Toast.Title />
        <Toast.Description className="px-3 py-5 text-white font-semibold">
          {content.text}
        </Toast.Description>
        <Toast.Action altText="Sei o que isso faz não" />
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport />
    </>
)
}