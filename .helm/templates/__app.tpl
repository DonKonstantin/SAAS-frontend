{{- define "app" }}
- name: {{ .Chart.Name }}-app
  image: {{ .Values.werf.image.app }}
  imagePullPolicy: Always
  resources:
    limits:
      memory: 300Mi
    requests:
      memory: 150Mi
  ports:
    - name: web
      containerPort: 3000
      protocol: TCP
  env: {{- include "externalVariables" . | nindent 4 }}
  livenessProbe:
    httpGet:
      path: /
      port: 3000
    initialDelaySeconds: 60
    periodSeconds: 5
  readinessProbe:
    httpGet:
      path: /
      port: 3000
    initialDelaySeconds: 5
    periodSeconds: 5
{{- end }}