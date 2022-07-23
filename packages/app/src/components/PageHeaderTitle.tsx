export interface PageHeaderTitleProps {
  children: React.ReactNode;
}

export const PageHeaderTitle = (props: PageHeaderTitleProps) => (
  <div className="flex items-center justify-center h-32 md:h-48 bg-graph-paper w-full">
    <h1 className="text-gray-300 text-2xl md:text-5xl uppercase font-misto">
      &#9679; {props.children} &#9679;
    </h1>
  </div>
);
