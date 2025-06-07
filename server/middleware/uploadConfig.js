const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer les dossiers de destination s'ils n'existent pas
const createUploadDirs = () => {
  const dirs = ['uploads', 'uploads/images', 'uploads/documents'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Dossier créé: ${dir}`);
    }
  });
};

// Initialiser les dossiers
createUploadDirs();

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    } else if (file.fieldname === 'techSheet') {
      cb(null, 'uploads/documents/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: (req, file, cb) => {
    // Créer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    
    cb(null, `${cleanBaseName}_${uniqueSuffix}${ext}`);
  }
});

// Filtres pour les types de fichiers
const fileFilter = (req, file, cb) => {
  console.log('🔍 Vérification du fichier:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype
  });
  
  if (file.fieldname === 'image') {
    // Vérifier que c'est une image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées pour le champ image'), false);
    }
  } else if (file.fieldname === 'techSheet') {
    // Vérifier que c'est un PDF
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont autorisés pour la fiche technique'), false);
    }
  } else {
    cb(new Error('Champ de fichier non reconnu'), false);
  }
};

// Configuration multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 2 // Maximum 2 fichiers
  }
});

// Middleware pour gérer l'upload de plusieurs types de fichiers
const uploadFiles = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'techSheet', maxCount: 1 }
]);

// Middleware avec gestion d'erreurs améliorée
const uploadMiddleware = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('❌ Erreur Multer:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          success: false,
          message: 'Fichier trop volumineux. Taille maximum: 5MB' 
        });
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ 
          success: false,
          message: 'Trop de fichiers. Maximum 2 fichiers autorisés' 
        });
      }
      return res.status(400).json({ 
        success: false,
        message: err.message 
      });
    } else if (err) {
      console.error('❌ Erreur upload:', err);
      return res.status(400).json({ 
        success: false,
        message: err.message 
      });
    }
    
    console.log('✅ Upload réussi, fichiers:', req.files);
    next();
  });
};

module.exports = {
  upload,
  uploadMiddleware,
  uploadFiles
};