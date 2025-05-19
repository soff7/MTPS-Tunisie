import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

const ITEMS: TreeNode[] = [
  {
    id: '1',
    label: 'Dashboard',
    children: [
      { id: '1.1', label: 'Home' },
      { id: '1.2', label: 'Reports' },
    ],
  },
  {
    id: '2',
    label: 'Settings',
    children: [{ id: '2.1', label: 'Profile' }],
  },
];

function renderTree(items: TreeNode[]): React.ReactNode {
  return items.map(({ id, label, children }) => (
    <TreeItem key={id} nodeId={id} label={label}>
      {children ? renderTree(children) : null}
    </TreeItem>
  ));
}

export default function CustomizedTreeView() {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle1" gutterBottom>
          Navigation
        </Typography>
        <TreeView
          aria-label="navigation"
          defaultExpanded={['1']}
          defaultSelected={['1.1']}
          multiSelect
        >
          {renderTree(ITEMS)}
        </TreeView>
      </CardContent>
    </Card>
  );
}
