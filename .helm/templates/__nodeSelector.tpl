{{- define "nodeSelector" }}
{{- if .Values.nodeSelector }}
nodeSelector: {{ toYaml .Values.nodeSelector | nindent 2 }}
{{- end }}
{{- end }}