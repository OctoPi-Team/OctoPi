using test.project as my from '../db/data-model';

namespace test.project;

service api @(CORS.allowAllOrigins: true) { // quickfix unsecure
   function getBlocks() returns array of String;
   function setBlock(id: my.Blocks:ID, state: my.Blocks:state) returns String;
}
