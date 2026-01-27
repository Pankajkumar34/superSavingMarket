import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Badge from '../ui/badge/Badge';

const GrowthBadge = ({ value }) => {
  const num = Number(value);

  if (num > 0) {
    return (
      <Badge color="success" className="flex items-center gap-1">
        <ArrowUpIcon className="w-4 h-4" />
        {num}%
      </Badge>
    );
  }

  if (num < 0) {
    return (
      <Badge color="danger" className="flex items-center gap-1">
        <ArrowDownIcon className="w-4 h-4" />
        {Math.abs(num)}%
      </Badge>
    );
  }

  return (
    <Badge color="secondary" className="flex items-center gap-1">
      0%
    </Badge>
  );
};

export default GrowthBadge