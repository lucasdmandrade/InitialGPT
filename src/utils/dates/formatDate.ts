import {format, isSameDay, subDays, subMonths} from 'date-fns';

const formatDate = (dateString: string): string => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  if (isSameDay(currentDate, targetDate)) {
    return 'Today';
  }

  const oneDayAgo = subDays(currentDate, 1);
  if (isSameDay(oneDayAgo, targetDate)) {
    return 'Yesterday';
  }

  const oneWeekAgo = subDays(currentDate, 7);
  if (targetDate >= oneWeekAgo && targetDate < currentDate) {
    return 'Previous 7 days';
  }

  const oneMonthAgo = subMonths(currentDate, 1);
  if (targetDate >= oneMonthAgo && targetDate < currentDate) {
    return 'Previous 30 days';
  }

  return format(targetDate, 'MMMM');
};

export default formatDate;
