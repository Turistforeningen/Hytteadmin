#!/bin/sh

if [ -z $1 ] || [ -z $2 ]; then
  echo "Missing input parameters required to send Slack notifications. Aborting!"
  exit 1
fi

success=$1 # true or false
shift
message=${@}


if [ "$success" = "info" ]; then
  color="#3686A6"
elif [ "$success" = true ]; then
  color="#36a64f"
else
  color="#FF0000"
fi

# Set Slack data
TAG=$(git describe --tags)
slack_data='{"attachments": [{"fallback": "'${CIRCLE_PROJECT_REPONAME}' - '${message}'","color": "'${color}'","title": "['${CIRCLE_PROJECT_REPONAME}'] - '${message}'","fields": [{"value": "'${CIRCLE_BRANCH}' / <https://circleci.com/gh/Turistforeningen/'${CIRCLE_PROJECT_REPONAME}'/'${CIRCLE_BUILD_NUM}'|'${CIRCLE_JOB}'> [<https://circleci.com/workflow-run/'${CIRCLE_WORKFLOW_ID}'|Open workflow>] - '${TAG}'","short": false}]}]}'


echo "sending slack notification ..."
curl -X POST $SLACK_WEBHOOK_CIRCLECI -H 'Content-type: application/json' --data "$slack_data"

if [ $? != 0 ]; then
  echo "Failed to send Slack notification!"
  exit 1
fi
