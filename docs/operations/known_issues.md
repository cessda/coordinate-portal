# Known Issues

[Home](../Home.md)

## Deployment stucked on Sonar Scan check

If this problem happens, you should check Jenkins pipeline logs to find the issue. The 2 main issues noticed are :

- SonarQube system is not available, you should check on Management cluster.
- Some plugins are missing, it may happen after an unexpected reboot of the container. You should then re-install the missing plugin, and check if the configuration persistent volume is present on the container
