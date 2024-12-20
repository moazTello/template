/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/main/applications/dataTables/components/DevelopmentTable';
import CheckTable from 'views/admin/main/applications/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/main/applications/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/main/applications/dataTables/components/ComplexTable';
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from 'views/admin/main/applications/dataTables/variables/columnsData';
import tableDataDevelopment from 'views/admin/main/applications/dataTables/variables/tableDataDevelopment.json';
import tableDataCheck from 'views/admin/main/applications/dataTables/variables/tableDataCheck.json';
import tableDataColumns from 'views/admin/main/applications/dataTables/variables/tableDataColumns.json';
import tableDataComplex from 'views/admin/main/applications/dataTables/variables/tableDataComplex.json';
import React from 'react';

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid mb="20px" columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
        <DevelopmentTable columnsData={columnsDataDevelopment} tableData={tableDataDevelopment} />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable columnsData={columnsDataColumns} tableData={tableDataColumns} />
        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />
      </SimpleGrid>
    </Box>
  );
}
