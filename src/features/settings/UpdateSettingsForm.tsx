import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSetting from './useSetting';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {settings, isLoading} = useSetting();
  const {updateSetting, isUpdating} = useUpdateSetting();
  const {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = settings ?? {};
  function handleUpdate(e:React.ChangeEvent<HTMLInputElement>, field: string){
    const value = e.target.value;
    if (! value) return;
    updateSetting({[field]:value});
  }
  if (isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'breakfast-price')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
