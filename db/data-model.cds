namespace test.project;
using { managed } from '@sap/cds/common';

entity Blocks : managed {
  key ID : Integer;
  state  : Boolean;
}
