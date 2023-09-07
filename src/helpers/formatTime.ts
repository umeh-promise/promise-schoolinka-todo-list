// This function adds a suffix to the time value either AM or PM
export const addSuffixToTime = (timeValue: string) => {
  if (timeValue?.trim() === '') return;
  const [hours, minutes] = timeValue.split(':').map(Number);
  const timeSuffix = hours < 12 ? 'am' : 'pm';
  let hours12Format = hours % 12;
  hours12Format = hours12Format === 0 ? 12 : hours12Format;
  const time = `${String(hours12Format).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')} ${timeSuffix}`;

  return time;
};

// This function capitalize the first letter of date value passed in
export const formatDate = (text: string) => {
  const [firstLetter, ...res] = text.split('');
  return firstLetter.toUpperCase().concat(res.join(''));
};
