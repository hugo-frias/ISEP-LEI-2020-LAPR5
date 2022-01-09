import React from 'react';
import { shallow } from 'enzyme';
import LinePath from '../../components/tabs/LinePath';
describe('Testes basicos LinePath', () => {
    const wrapper = shallow(<LinePath />);

    it('should have check path button component', () => {
        expect(wrapper.find('Button#checkPath').text()).toEqual('Check Code');
    });

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#botaoSubmit').text()).toEqual('Add to Line');
    });

    it('should have input for line', () => {
        expect(wrapper.find('Select#line').exists);
    });

    it('should have input for path', () => {
        expect(wrapper.find('Select#path').exists);
    });

    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });

    it('should have an empty path', () => {
        expect(wrapper.state('path')).toEqual('');
    });

    it('should have a filter by default', () => {
        expect(wrapper.state('filterType')).toEqual('NOFILTER');
    });
    it('should have an empty lines array', () => {

        expect(wrapper.state('lines')).toEqual([]);
    });
    it('should have an empty optionsPaths array', () => {

        expect(wrapper.state('optionsPaths')).toEqual([]);
    });
    it('should have an empty optionsLines array', () => {

        expect(wrapper.state('optionsLines')).toEqual([]);
    });
    it('should have an empty codesAux array', () => {

        expect(wrapper.state('codesAux')).toEqual([]);
    });
});