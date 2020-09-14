import React from 'react';
import {View } from 'react-native';
import renderer from 'react-test-renderer';

describe('meta testcases', () => {
    it('react-test-renderer works properly', () => {
        const tree = renderer.create(<View><View></View></View>).toJSON()
        expect(tree.children.length).toBe(1)
    });
});