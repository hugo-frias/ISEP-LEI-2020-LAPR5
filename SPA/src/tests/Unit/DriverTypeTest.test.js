import React from 'react';
import { shallow } from 'enzyme';
import DriverType from '../../components/tabs/DriverType';
describe('Testes basicos Driver Type', () => {
    const wrapper = shallow(<DriverType />);

    

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#btnSubmit').text()).toEqual('Submit');
    });


    it('should have input for code', () => {
        expect(wrapper.find('input#code').exists);
    });

    it('should have input for description', () => {
        expect(wrapper.find('input#description').exists);
    });




    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });
    it('should have an empty description', () => {

        expect(wrapper.state('description')).toEqual('');
    });

});