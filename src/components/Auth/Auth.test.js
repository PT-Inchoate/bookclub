import React from 'react';
import { shallow } from 'enzyme';

import { Auth } from './Auth';

describe('Auth component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Auth match={{ path: 'Login' }}/>);
    });

    describe('checking the behavior of the sign up part ', () => { 

        it('renders login at the top of the form', () => {
            expect(wrapper.find('h1').at(0).text()).toEqual('Sign Up');
        });
    
        it('renders login button', () => {
            expect(wrapper.find('.Auth-form__btn').exists()).toBe(true); 
        });

        it('renders social icons', () => {
            expect(wrapper.find('.Auth-form__social-container').children().length).toEqual(3);
        });

        it('renders checkbox ', () => {
            expect(wrapper.find('.Auth-checkbox').exists()).toBe(true); 
        });
    })

    describe('checking the behavior of the login form ', () => { 
        let testUser = {
            username: 'tester',
            email: 'testTest@gmail.com',
            password: '758347582'
        };

        beforeEach(() => {   
            wrapper.find('input').at(0).simulate('change', {
                target: { name: 'username', value: testUser.username }
            });

            wrapper.find('input').at(0).simulate('change', {
                target: { name: 'email', value: testUser.email }
            });

            wrapper.find('input').at(0).simulate('change', {
                target: { name: 'password', value: testUser.password }
            });

            const fakeEvent = { preventDefault: () => console.log('preventDefault') };
            wrapper.find('.Auth-form').simulate('submit', fakeEvent);
        }); 

        it('updates the username on state', () => {
            expect(wrapper.state().username).toEqual(testUser.username);
        });

        it('updates the user email on state', () => {
            expect(wrapper.state().email).toEqual(testUser.email);
        });
        // console.log(wrapper.debug())

        it('updates the user password on state', () => {
            expect(wrapper.state().password).toEqual(testUser.password);
        });

        it('updates loading on state', () => {
            expect(wrapper.state().loading).toEqual(true);
        });

        it('updates errors array is empty on state', () => {
            expect(wrapper.state().errors).toEqual([]);
        });
    })


})