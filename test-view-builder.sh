#!/bin/sh

mkdir test-view -p
cp test-report.html ./test-view
cp coverage/lcov-report ./test-view/
echo "<!DOCTYPE html><html><body><h1>Test Results</h1><a href="test-report.html">Test report</a><br><a href="./lcov-report">Coverage Report</a></body></html>" > test-view/index.html
