// node
import path from 'path';
// vendors
import React from 'react';
// project
import Menu from 'components/Menu';
import TestUtils from 'helpers/TestUtils';
// locals

describe('Testing', () => {
  it('node import should work', () => {
    expect(path).to.not.equal(null);
  });
  it('vendors import should work', () => {
    expect(React).to.not.equal(null);
  });
  it('source module import should work', () => {
    expect(Menu).to.not.equal(null);
  });
  it('test module import should work', () => {
    expect(TestUtils).to.not.equal(null);
  });
});
