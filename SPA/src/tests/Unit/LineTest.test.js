import React from 'react';
import { shallow } from 'enzyme';
import Line from '../../components/tabs/Line';
describe('Testes basicos Line', () => {
    const wrapper = shallow(<Line />);

    it('should have check code button component', () => {
        expect(wrapper.find('Button#checkCode').text()).toEqual('Check code');
    });

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#botaoSubmit').text()).toEqual('Submit');
    });


    it('should have input for code', () => {
        expect(wrapper.find('input#code').exists);
    });

    it('should have input for name', () => {
        expect(wrapper.find('input#name').exists);
    });


    it('should have input for colorPicker', () => {
        expect(wrapper.find('CirclePicker#colorPicker').exists);
    });


    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });
    it('should have an empty name', () => {

        expect(wrapper.state('name')).toEqual('');
    });
    it('should have an empty color', () => {

        expect(wrapper.state('color')).toEqual('');
    });
    it('should have a default filterType', () => {

        expect(wrapper.state('filterType')).toEqual('NOFILTER');
    });
    it('should have an empty codesAux array', () => {

        expect(wrapper.state('codesAux')).toEqual([]);
    });

});