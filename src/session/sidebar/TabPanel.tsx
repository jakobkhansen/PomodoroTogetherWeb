export type TabPanelProps = {
  index: number;
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  return <div className="h-full dark:bg-slate-800">{children}</div>;
};
