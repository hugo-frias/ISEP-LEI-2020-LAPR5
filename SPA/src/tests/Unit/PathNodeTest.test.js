import React from 'react';
import { shallow } from 'enzyme';
import PathNode from '../../components/tabs/PathNode';
describe('Testes basicos Path Node', () => {
    const wrapper = shallow(<PathNode />);

    

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#btnSubmit').text()).toEqual('Submit');
    });


    it('should have input for code', () => {
        expect(wrapper.find('input#code').exists);
    });

    it('should have input for duration', () => {
        expect(wrapper.find('input#duration').exists);
    });
    it('should have input for distance', () => {
        expect(wrapper.find('input#distance').exists);
    });

    it('should have input for node', () => {
        expect(wrapper.find('input#node').exists);
    });



    it('should have an empty code', () => {
        expect(wrapper.state('code')).toEqual('');
    });
    it('should have an undefined default duration', () => {

        expect(wrapper.state('duration')).toEqual(null);
    });
    it('should have an undefined default distance', () => {

        expect(wrapper.state('distance')).toEqual(null);
    });
    it('should have an undefined default node', () => {

        expect(wrapper.state('node')).toEqual('');
    });
    it('should have an empty options array', () => {

        expect(wrapper.state('options')).toEqual([]);
    });

});