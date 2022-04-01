export type TabPanelProps = {
  index: number;
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  return <div className="h-full bg-slate-100 dark:bg-slate-800">{children}</div>;
};
