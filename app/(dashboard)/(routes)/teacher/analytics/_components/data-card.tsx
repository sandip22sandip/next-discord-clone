import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  // Define a class for the dark theme
  const darkThemeClass = "dark:text-white"; // Replace with the appropriate class for your dark theme

  return (
    <Card>
      <CardHeader
        className={`flex flex-row items-center justify-between space-y-0 pb-2 ${darkThemeClass}`}
      >
        <CardTitle className={`text-sm font-medium ${darkThemeClass}`}>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className={`text-2xl font-bold ${darkThemeClass}`}>
        {shouldFormat ? formatPrice(value) : value}
      </CardContent>
    </Card>
  );
};
