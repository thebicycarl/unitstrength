#!/usr/bin/env node

/**
 * Video Optimization Script
 * 
 * This script compresses your hero video from 50MB to a much smaller size.
 * 
 * Run: node optimize-video.js
 */

const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// Set the ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Usage: node optimize-video.cjs [input path]
// Default: public/Cut clip v2.mp4
const inputVideo = process.argv[2] || 'public/Cut clip v2.mp4';
const parsed = path.parse(inputVideo);
const outputVideo = path.join(parsed.dir, `${parsed.name}-optimized${parsed.ext}`);

console.log('🎬 Video Optimization Script');
console.log('=============================\n');

// Check if input video exists
if (!fs.existsSync(inputVideo)) {
  console.error(`❌ Input video not found: ${inputVideo}`);
  process.exit(1);
}

const stats = fs.statSync(inputVideo);
const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`📹 Input video: ${inputVideo}`);
console.log(`   Size: ${fileSizeInMB} MB`);
console.log(`📤 Output video: ${outputVideo}\n`);

console.log('⏳ Compressing video with optimized settings...');
console.log('   - Using H.264 codec with CRF 28 (good quality)');
console.log('   - AAC audio at 128kbps');
console.log('   - Fast start enabled for web playback\n');
console.log('This may take a few minutes...\n');

// Compress video with optimized settings
ffmpeg(inputVideo)
  .outputOptions([
    '-c:v libx264',           // Use H.264 codec
    '-preset slow',           // Better compression ratio
    '-crf 28',                // Quality setting (23 is default, 28 is good for web)
    '-c:a aac',               // Use AAC audio codec
    '-b:a 128k',              // Audio bitrate
    '-movflags +faststart',   // Enable fast start for web
    '-y'                      // Overwrite output file
  ])
  .output(outputVideo)
  .on('start', () => {
    console.log('🚀 Starting compression...\n');
  })
  .on('progress', (progress) => {
    if (progress.percent) {
      process.stdout.write(`\r⏱️  Progress: ${Math.round(progress.percent)}%`);
    }
  })
  .on('end', () => {
    console.log('\n');
    
    try {
      const outputStats = fs.statSync(outputVideo);
      const outputSizeInMB = (outputStats.size / (1024 * 1024)).toFixed(2);
      const compressionRatio = ((1 - outputStats.size / stats.size) * 100).toFixed(1);
      
      console.log('✅ Video compression completed!');
      console.log(`📉 Size reduction: ${fileSizeInMB} MB → ${outputSizeInMB} MB`);
      console.log(`📊 Compression: ${compressionRatio}% smaller\n`);
      
      console.log('📝 Next steps:');
      console.log(`1. Back up your original: mv "${inputVideo}" "${inputVideo}.backup"`);
      console.log(`2. Use the optimized version: mv "${outputVideo}" "${inputVideo}"`);
      console.log('3. Test your site and verify the quality looks good');
      console.log('\n💡 If the quality needs adjustment, edit this script and change the CRF value:');
      console.log('   - Lower CRF (23-25) = better quality, larger file');
      console.log('   - Higher CRF (28-32) = smaller file, lower quality\n');
      
    } catch (error) {
      console.error('⚠️  Warning: Could not read output file stats');
    }
  })
  .on('error', (error, stdout, stderr) => {
    console.error('\n❌ Error compressing video:');
    console.error(error.message);
    if (stderr) {
      console.error('\nFull error:', stderr);
    }
    process.exit(1);
  })
  .run();
