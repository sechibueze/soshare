import { render, screen, fireEvent } from '@testing-library/react-native';
import InputBox from '.';

describe('InputBox', () => {
  it('InputBox renders unit', () => {
    render(<InputBox label={'hello'} value={'message'} />);
    //   const element = screen.getByPlaceholderText('message');

    const element = screen.getByDisplayValue('message');
    // console.log(element);
    // expect([2, 3, 4]).toHaveLength(3);
    expect(element).toBeTruthy();
  });
});
