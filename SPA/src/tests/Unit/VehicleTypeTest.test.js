import React from 'react';
import { shallow } from 'enzyme';
import VehicleType from '../../components/tabs/VehicleType';
describe('Testes basicos Vehicle Type', () => {
    const wrapper = shallow(<VehicleType />);

    
    /*it('should have check code button component', () => {
        expect(wrapper.find('Button#checkCode').text()).toEqual('Check code');
    });*/

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#botaoSubmit').text()).toEqual('Submit');
    });


    it('should have input for code', () => {
        expect(wrapper.find('input#code').exists);
    });

    it('should have input for name', () => {
        expect(wrapper.find('input#name').exists);
    });
    it('should have input for autonomy', () => {
        expect(wrapper.find('input#autonomy').exists);
    });

    it('should have input for avgSpeed', () => {
        expect(wrapper.find('input#avgSpeed').exists);
    });
    it('should have input for consumption', () => {
        expect(wrapper.find('input#consumption').exists);
    });

    it('should have input for cost', () => {
        expect(wrapper.find('input#cost').exists);
    });

    it('should have input for energy', () => {
        expect(wrapper.find('input#energy').exists);
    });

    it('should have input for emission', () => {
        expect(wrapper.find('input#emission').exists);
    });





    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });
    it('should have an empty name', () => {

        expect(wrapper.state('name')).toEqual('');
    });
    it('should have an  default autonomy', () => {

        expect(wrapper.state('autonomy')).toEqual(0);
    });
    it('should have an  default cost', () => {

        expect(wrapper.state('cost')).toEqual(0);
    });
    it('should have an  default consumption', () => {

        expect(wrapper.state('consumption')).toEqual(0);
    });
    it('should have an  default energy', () => {

        expect(wrapper.state('energy')).toEqual(1);
    });
    it('should have an  default avgSpeed', () => {

        expect(wrapper.state('avgSpeed')).toEqual(0);
    });
    it('should have an  default emission', () => {

        expect(wrapper.state('emission')).toEqual(0);
    });
    /*it('should have an empty codesAux array', () => {

        expect(wrapper.state('codesAux')).toEqual([]);
    });*/

});