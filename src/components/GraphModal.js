import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphModal = ({ open, onClose, data, title, xAxisKey, barKey, lineKey, yAxisLeftLabel, yAxisRightLabel }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey={xAxisKey} tick={{ fill: '#B0BEC5' }} />
              <YAxis yAxisId="left" tick={{ fill: '#B0BEC5' }} label={{ value: yAxisLeftLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#B0BEC5' }} label={{ value: yAxisRightLabel, angle: -90, position: 'insideRight', offset: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey={barKey} barSize={20} fill="#05CD99" />
              <Line yAxisId="right" type="monotone" dataKey={lineKey} stroke="#84D9FC" strokeWidth={3} dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GraphModal;