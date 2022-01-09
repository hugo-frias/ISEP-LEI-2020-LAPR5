import React from 'react';
import { shallow } from 'enzyme';
import Path from '../../components/tabs/Path';
describe('Testes basicos Path ', () => {
    const wrapper = shallow(<Path />);

    

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#btnSubmit').text()).toEqual('Submit');
    });


    it('should have input for code', () => {
        expect(wrapper.find('input#code').exists);
    });

    it('should have input for isEmpty', () => {
        expect(wrapper.find('input#isEmpty').exists);
    });
    it('should have input for PathNodes', () => {
        expect(wrapper.find('input#PathNodes').exists);
    });




    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });
    it('should have a default isEmpty', () => {

        expect(wrapper.state('isEmpty')).toEqual(false);
    });
    it('should have an empty pathNodes array', () => {

        expect(wrapper.state('pathNodes')).toEqual([]);
    });
    it('should have an empty options array', () => {

        expect(wrapper.state('options')).toEqual([]);
    });

});