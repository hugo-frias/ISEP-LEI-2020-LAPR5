import React from 'react';
import { shallow } from 'enzyme';
import Node from '../../components/tabs/Node';
describe('Testes basicos Node', () => {
    const wrapper = shallow(<Node />);

    

    it('should have check submit button component', () => {
        expect(wrapper.find('Button#btnSubmit').text()).toEqual('Submit');
    });


    it('should have input for name', () => {
        expect(wrapper.find('input#name').exists);
    });

    it('should have input for shortName', () => {
        expect(wrapper.find('input#shortName').exists);
    });
    it('should have input for longitude', () => {
        expect(wrapper.find('input#longitude').exists);
    });

    it('should have input for latitude', () => {
        expect(wrapper.find('input#latitude').exists);
    });
    it('should have input for isDepot', () => {
        expect(wrapper.find('input#isDepot').exists);
    });

    it('should have input for isReliefPoint', () => {
        expect(wrapper.find('input#isReliefPoint').exists);
    });



    // it('should have an empty name', () => {
    //     expect(wrapper.state('name')).toEqual('');
    // });
    // it('should have an empty shortName', () => {

    //     expect(wrapper.state('shortName')).toEqual('');
    // });
    it('should have an empty filterValue', () => {

        expect(wrapper.state('filterValue')).toEqual('');
    });
    it('should have a default filterType shortName', () => {

        expect(wrapper.state('filterType')).toEqual('all');
     });
    // it('should have a default isDepot status', () => {

    //     expect(wrapper.state('isDepot')).toEqual(false);
    // });
    // it('should have a default isReliefPoint status', () => {

    //     expect(wrapper.state('isReliefPoint')).toEqual(false);
    // });
    // it('should have a default longitude', () => {

    //     expect(wrapper.state('longitude')).toEqual(0);
    // });
    // it('should have a default latitude', () => {

    //     expect(wrapper.state('latitude')).toEqual(0);
    // });

});