@echo off
echo Starting script...

REM Initialize Conda for this session
echo Initializing Conda...
call "%USERPROFILE%\anaconda3\Scripts\activate.bat" base
if %errorlevel% neq 0 (
    echo Conda initialization failed. Exiting.
    exit /b %errorlevel%
)

REM Activate the Conda environment
echo Activating Conda environment...
call conda activate deep_learning
if %errorlevel% neq 0 (
    echo Conda environment activation failed. Exiting.
    exit /b %errorlevel%
)

REM Change directory to OpenPose
cd openpose
echo Changed directory to OpenPose

REM Run OpenPose with specified parameters
bin\OpenPoseDemo.exe --image_dir ..\VITON-HD\datasets\test\image --hand --disable_blending --display 0 --write_json ..\VITON-HD\datasets\test\openpose-json --write_images ..\VITON-HD\datasets\test\openpose-img --num_gpu 1 --num_gpu_start 0
if %errorlevel% neq 0 (
    echo OpenPose failed. Exiting.
    exit /b %errorlevel%
)

REM Change directory to Human-Parsing
cd ..\Human-Parsing
echo Changed directory to Human-Parsing

REM Run Visual Studio setup script for x64
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
if %errorlevel% neq 0 (
    echo Visual Studio environment setup failed. Exiting.
    exit /b %errorlevel%
)

REM Run the human parsing script
echo Running human parsing script...
python simple_extractor.py --dataset lip --model-restore lip_final.pth --input-dir ..\VITON-HD\datasets\test\image --output-dir ..\VITON-HD\datasets\test\image-parse
if %errorlevel% neq 0 (
    echo Human parsing script failed. Exiting.
    exit /b %errorlevel%
)

REM Change directory to VITON-HD
cd ..\VITON-HD
echo Changed directory to VITON-HD

REM Run VITON-HD test script
echo Running VITON-HD test script...
python test.py --name VITON
if %errorlevel% neq 0 (
    echo VITON test script failed. Exiting.
    exit /b %errorlevel%
)

echo All tasks completed successfully.
pause
