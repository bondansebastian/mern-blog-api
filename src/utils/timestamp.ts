export default function timestamp(date?: Date|undefined)
{
    if (date === undefined) {
        date = new Date();
    }
    return date.getTime();
}