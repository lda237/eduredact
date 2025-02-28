interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};