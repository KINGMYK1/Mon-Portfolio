import { motion } from 'framer-motion';
import './Loading.css';

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-container"
    >
      <div className="loading-content">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="loading-spinner"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="loading-text"
        >
          Loading du portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loading;